require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require('./middleware/auth');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const User = require('./model/User');
const RoomCategory = require('./model/RoomCategory');
const Room = require('./model/Room');
const Booking = require('./model/Booking')
const Gallery = require('./model/Gallery');
const Payment = require('./model/Payment');

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only this origin
  credentials: true, // Allow cookies to be sent
};

const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors(corsOptions))


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  console.error('Uploads directory does not exist. Creating now...');
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });
app.use("/uploads", express.static("uploads"))

// Registration 
app.post('/registration', upload.single('image'), async (req, res) => {
  try {
    const { name, phone, address, city, state, country, dateOfBirth, email, password, role } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!(name && phone && address && city && state && country && dateOfBirth && email && password && role)) {
      return res.status(400).send("All fields are compulsory");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send("User already exists with this Email");
    }

    const myEncPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      address,
      city,
      state,
      country,
      dateOfBirth,
      email,
      password: myEncPassword,
      role,
      image
    });

    const token = jwt.sign({ id: user._id, email }, process.env.JWT_SECRET, { expiresIn: '2h' });

    user.token = token;
    user.password = undefined;

    return res.status(201).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

// Login
app.post('/login', async (req, res) => {
  try {
    // get all data from frontend
    const { email, password } = req.body

    // validation
    if (!(email && password)) {
      return res.status(400).send("Send all data");
    }

    // find user in DB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send("User not found");
    }

    // match the password
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET, //process.env.jwtsecret
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      user.password = undefined;

      // send a token in user cookie
      // cookie section
      const options = {
        //expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        expires: new Date(Date.now() + 60 * 60 * 1000),
        // httpOnly: true
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });

    } else {
      return res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }

})

// Get All Users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
})

// Get Single User By Id    
app.get('/user/:id', async (req, res) => {
  const userId = req.params.id
  try {
    const users = await User.findById(userId)
    res.status(200).json(users)
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
})

// Update User
app.put('/user/:id', upload.single('image'), async (req, res) => {
  const userId = req.params.id;
  const { name, phone, address, city, state, country, dateOfBirth, email, password, role } = req.body;

  try {
    const updateFields = { name, phone, address, city, state, country, dateOfBirth, email, role };

    if (password) {
      const myEncPassword = await bcrypt.hash(password, 10);
      updateFields.password = myEncPassword;
    }

    if (req.file) {
      updateFields.image = req.file.filename;
    }

    const updateUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

    if (!updateUser) {
      return res.status(404).send({ msg: 'User not found' });
    }

    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete User
app.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    // Find the category by id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Get the image file path
    const imagePath = path.join(__dirname, 'uploads', user.image);

    // Delete the category from the database
    await User.findByIdAndDelete(userId);

    // Check if the image file exists and delete it
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image file:', err);
        } else {
          console.log('Image file deleted:', imagePath);
        }
      });
    }

    res.status(200).json({ msg: 'User and image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
})

// Add new Category
app.post('/roomCategory', upload.single('image'), async (req, res) => {
  try {
    const { name, price, maxPerson, facilities, description } = req.body
    const image = req.file ? req.file.filename : null;

    if (!(name && price && maxPerson && facilities && description && image)) {
      res.status(400).send("All fields are Require")
    }
    // check Room already exitst - roomNumber
    const existingRoom = await RoomCategory.findOne({ name })
    if (existingRoom) {
      return res.status(401).send({ msg: `Category already exists with ${name} Name` });
    }
    const newCategory = await RoomCategory.create({
      name,
      price,
      maxPerson,
      facilities,
      description,
      image
    })
    res.status(201).send(newCategory)

  } catch (error) {
    res.status(500).send(error)
  }
})

// Get All Category
app.get('/roomCategory', async (req, res) => {
  try {
    const category = await RoomCategory.find()
    res.status(200).json(category)
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
})

// Get Single Category By Id
app.get('/roomCategory/:id', async (req, res) => {
  const categoryId = req.params.id
  try {
    const category = await RoomCategory.findById(categoryId)
    if (!category) {
      return res.status(404).send('Category not found')
    }
    res.status(200).json(category)
    console.log(category);

  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
})

// Update Category Route
app.put('/roomCategory/:id', upload.single('image'), async (req, res) => {
  const categoryId = req.params.id;
  const { name, price, maxPerson, facilities, description } = req.body;

  try {
    const updateFields = { name, price, maxPerson, facilities, description };

    if (req.file) {
      updateFields.image = req.file.filename;
    }

    const updatedCategory = await RoomCategory.findByIdAndUpdate(
      categoryId,
      updateFields,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({ msg: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete Category
app.delete('/roomCategory/:id', async (req, res) => {
  const categoryId = req.params.id;
  try {
    // Find the category by id
    const category = await RoomCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ msg: 'Category not found' });
    }

    // Get the image file path
    const imagePath = path.join(__dirname, 'uploads', category.image);

    // Delete the category from the database
    await RoomCategory.findByIdAndDelete(categoryId);

    // Check if the image file exists and delete it
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image file:', err);
        } else {
          console.log('Image file deleted:', imagePath);
        }
      });
    }

    res.status(200).json({ msg: 'Category and image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.post('/room', async (req, res) => {
  try {
    const { roomNumber, roomCategoryId, status } = req.body;
    if (!(roomNumber && roomCategoryId)) {
      return res.status(400).send("All fields are required");
    }
    // Check if the room already exists
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(401).send({ msg: `Room already exists with room number ${roomNumber}` });
    }
    // Create new room
    const newRoom = await Room.create({
      roomNumber,
      roomCategoryId,
      status
    });
    res.status(201).send(newRoom);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get All Rooms
app.get('/rooms', async (req, res) => {
  try {
    const allRooms = await Room.find().populate('roomCategoryId', 'name price maxPerson facilities description')
    res.status(200).json(allRooms)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Get Single Rooms
app.get('/room/:id', async (req, res) => {
  // console.log(req.params.id);
  try {
    const room = await Room.findById(req.params.id).populate('roomCategoryId')
    // console.log(room);
    if (!room) {
      return res.status(404).send('Room not found')
    }
    res.status(200).json(room)
  } catch (error) {
    res.status(500).send(error)
  }
})

// Update Room 
app.put('/room/:id', async (req, res) => {
  const roomId = req.params.id;
  const { roomNumber, roomCategoryId, status } = req.body;
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      roomId,
      { roomNumber, roomCategoryId, status },
      { new: true }
    );
    if (!updateRoom) {
      return res.status(404).send({ msg: 'Room Not Found' });
    }
    res.status(200).send(updateRoom);
    //console.log(updateRoom);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete Room 
app.delete('/room/:id', async (req, res) => {
  try {
    const deleteRoom = await Room.findByIdAndDelete(req.params.id)
    if (!deleteRoom) {
      res.status(404).send({ msg: 'User not found' })
    }
    res.status(200).send('Room delete Successfully')
  } catch (error) {
    res.status(500).send(error)
  }
})

// AvailableRoom Rooms 
app.post('/availableRoom', async (req, res) => {
  const { checkInDate, checkOutDate } = req.body.formData;

  try {
    // Convert dates to JavaScript Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Find all bookings that overlap with the provided dates
    const bookings = await Booking.find({
      $or: [
        {
          checkInDate: { $lt: checkOut },
          checkOutDate: { $gt: checkIn }
        }
      ]
    }).select('roomId');

    // Extract room IDs that are already booked
    const bookedRoomIds = bookings.map(booking => booking.roomId);

    // Find all rooms that are not booked during the specified period
    const availableRooms = await Room.find({
      _id: { $nin: bookedRoomIds },
      // status: 'available'
    }).populate('roomCategoryId', 'name price maxPerson facilities description');

    res.status(200).json(availableRooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ReAvailableRoom Rooms 
app.post('/reAvailableRoom', async (req, res) => {
  const { checkInDate, checkOutDate, roomId } = req.body;
  console.log(roomId);

  try {
    // Convert dates to JavaScript Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Check if the room is booked during the specified period
    const booking = await Booking.findOne({
      roomId,
      $or: [
        {
          checkInDate: { $lt: checkOut },
          checkOutDate: { $gt: checkIn }
        }
      ]
    });

    // If a booking exists, the room is not available
    if (booking) {
      return res.status(409).json({ message: 'Room is not available for the selected dates.' });
    }

    // If no booking exists, the room is available
    const room = await Room.findById(roomId).populate('roomCategoryId', 'name price maxPerson facilities description');

    if (!room) {
      return res.status(404).json({ message: 'Room not found.' });
    }

    res.status(200).json({ message: 'Room is available, wait for payment process', room });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Create a new booking
app.post('/booking', async (req, res) => {
  const bookingData = req.body;

  if (!bookingData.userId || !bookingData.roomId || !bookingData.checkInDate || !bookingData.checkOutDate || !bookingData.totalPrice) {
    return res.status(400).send("Invalid booking details");
  }

  try {
    const newBooking = new Booking({
      ...bookingData,
      status: 'pending',
    });

    await newBooking.save();
    res.json({ bookingId: newBooking._id });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).send("Error creating booking");
  }
});


// Get All Booking
app.get('/bookings', async (req, res) => {
  try {
    const allbokings = await Booking.find().populate('userId').populate('roomId');
    res.status(200).json(allbokings);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

// Get Single Booking Room
app.get('/booking/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('userId').populate('roomId')
    if (!booking) {
      return res.status(404).send('Booking not found')
    }
    res.status(200).send(booking)
  } catch (error) {
    res.status(500).json(error.message)
  }
})

// Update Booking 
app.put('/booking/:id', async (req, res) => {
  try {
    const { status } = req.body
    const updateBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!updateBooking) {
      res.status(404).send({ msg: 'Booking Not Found.' })
    }
    if (status === 'cancelled') {
      const room = await Room.findById(updateBooking.roomId)
      room.status = 'available'
      await room.save()
    }
    res.status(200).json(updateBooking);
  } catch (error) {
    res.status(500).send(error.message);
  }
})

// Delete Booking
app.delete('/booking/:id', async (req, res) => {
  try {

    const deletedBooking = await Booking.findByIdAndDelete(req.params.id)

    if (!deletedBooking) {
      return res.status(404).send('Booking not found');
    }

    const room = await Room.findById(deletedBooking.roomId)
    room.status = 'available'
    await room.save()

    res.status(200).send('Booking cancelled successfully');

  } catch (error) {
    res.status(500).send(error.message);
  }
})

// Get all gallery images
app.get('/gallery', async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single gallery images
app.get('/gallery/:id', async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new gallery image
app.post('/gallery', upload.single('image'), async (req, res) => {
  const gallery = new Gallery({
    imageName: req.file.filename,
    category: req.body.category,
    description: req.body.description,
  });
  try {
    const newGallery = await gallery.save();
    res.status(201).json(newGallery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Update a gallery image
app.put('/gallery/:id', upload.single('image'), async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' });
    }
    gallery.category = req.body.category || gallery.category;
    gallery.description = req.body.description || gallery.description;
    if (req.file) {
      gallery.imageName = req.file.filename;
    }
    const updatedGallery = await gallery.save();
    res.json(updatedGallery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Delete a gallery image
app.delete('/gallery/:id', async (req, res) => {
  const imageId = req.params.id;
  try {
    // Find the category by id
    const image = await Gallery.findById(imageId);
    if (!image) {
      return res.status(404).json({ msg: 'Image not found' });
    }
    // Get the image file path
    const imagePath = path.join(__dirname, 'uploads', image.imageName);

    // Delete the category from the database
    await Gallery.findByIdAndDelete(imageId);

    // Check if the image file exists and delete it
    if (fs.existsSync(imagePath)) {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image file:', err);
        } else {
          console.log('Image file deleted:', imagePath);
        }
      });
    }

    res.json({ message: 'Gallery image deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get All Payment
app.get('/payment', async (req, res) => {
  try {
    const allPayment = await Payment.find().populate('bookingId').populate('userId');
    res.status(200).json(allPayment);
  } catch (error) {
    res.status(500).json(error.message)
  }
})


// Create a checkout session
app.post('/create-checkout-session', async (req, res) => {
  const { bookingId } = req.body;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).send('Booking not found');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: `Room Number: ${booking.roomId}`,
            description: `Check-In Date: ${booking.checkInDate.toDateString()}\nCheck-Out Date: ${booking.checkOutDate.toDateString()}`,
          },
          unit_amount: booking.totalPrice * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:3000/payment-success',
      cancel_url: 'http://localhost:3000/payment-cancel',
      client_reference_id: booking._id.toString(),
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Handle payment success webhook from Stripe
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, 'your-webhook-secret'); // Replace with your webhook secret key
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.sendStatus(400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const booking = await Booking.findById(session.client_reference_id);

      if (!booking) {
        return res.sendStatus(404);
      }

      booking.status = 'confirmed';
      booking.updatedAt = Date.now();
      await booking.save();

      await Payment.create({
        userId: booking.userId,
        bookingId: booking._id,
        amount: session.amount_total / 100,
        paymentDate: new Date(),
        paymentMethod: 'card',
      });

      console.log('Booking and payment updated successfully');
    } catch (err) {
      console.error('Error processing payment success:', err);
    }
  }

  res.json({ received: true });
});

app.listen(3001, () => {
  console.log('Server is Running....');
})
