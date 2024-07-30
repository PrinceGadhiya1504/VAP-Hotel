const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require('./middleware/auth');
const User = require('./model/User');
const RoomCategory = require('./model/RoomCategory');
const Room = require('./model/Room');
const Booking = require('./model/Booking')

const corsOptions = {
    origin: 'http://localhost:3000', // Allow only this origin
    credentials: true, // Allow cookies to be sent
  };

const app = express()
app.use(express.json())
app.use(cookieParser());
app.use(cors(corsOptions))

mongoose.connect("mongodb+srv://PrinceGadhiya:123@merndb.eyezfe8.mongodb.net/VAP-Hotel")

// Registration 
app.post('/registration', async(req, res) => {
    try {
        // get all data from body
        const {name, phone, address, city, state, country, dateOfBirth, email, password, role} = req.body

        if(!(name && phone && address && city && state && country && dateOfBirth && email && password && role)){
            return res.status(400).send("All fields are compulsory")
        }

        // check user already exits - email
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(401).send("User already exists with this Email");
        }

        // encrypt the password
        const myEncPassword = await bcrypt.hash(password, 10)

        //save User in Db
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
            role
        })

        // generate a token for user and send it
        const token = jwt.sign(
            {id: user._id, email},
            "vvaapp", //process.env.jwtsecret
            {
                expiresIn: '2h'
            }
        )

        user.token = token
        user.password = undefined

        return res.status(201).send(user)

    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
})

// Login
app.post('/login', async(req, res) => {
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
            "vvaapp", //process.env.jwtsecret
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
app.get('/users',  async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
})

// Get Single User By Id
app.get('/user/:id',  async(req, res) => {
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
app.put('/user/:id',  async(req, res) => {
    const userId = req.params.id
    const { name, phone, address, city, state, country, dateOfBirth, email, password, role } = req.body
    try {
        // encrypt the password
        const myEncPassword = await bcrypt.hash(password, 10)
        
        const updateUser = await User.findByIdAndUpdate(
            userId,
            { name, phone, address, city, state, country, dateOfBirth, email, password: myEncPassword, role },
            { new: true }
        )

        if(!updateUser){
          return res.status(404).send('User not found')
        }
        res.status(200).json(updateUser)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// Delete User
app.delete('/user/:id',  async(req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        if(!deleteUser){
            res.status(404).send('User not found')
        }
        res.status(200).send('User delete Successfully')
    } catch (error) {
        res.status(500).send(error)
    }
})

// Add new Category
app.post('/roomCategory', async(req, res) => {
    try {
        const { name, price, maxPerson, facilities, description } = req.body

        if(!(name && price && maxPerson && facilities && description)){
            res.status(400).send("All fields are Require")
        }
        // check Room already exitst - roomNumber
        const existingRoom = await RoomCategory.findOne({name})
        if(existingRoom){
            return res.status(401).send(`Room already exists with ${name} Name`);
        }
        const newCategory = await RoomCategory.create({
            name, 
            price, 
            maxPerson, 
            facilities, 
            description
        })
        res.status(201).send(newCategory)

    } catch (error) {
        res.status(500).send(error)
    }
})

// Get All Category
app.get('/roomCategory',  async(req, res) => {
    try {
        const category = await RoomCategory.find()
        res.status(200).json(category)
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
})

// Get Single Category By Id
app.get('/roomCategory/:id',  async(req, res) => {
    const categoryId = req.params.id
    try {
        const category = await RoomCategory.findById(categoryId)
        if(!category){
            return res.status(404).send('Category not found')
        }
        res.status(200).json(category)
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
})

// Update Category
app.put('/roomCategory/:id',  async(req, res) => {
    const categoryId = req.params.id
    const { name, price, maxPerson, facilities, description } = req.body
    try {
        const updateCategory = await RoomCategory.findByIdAndUpdate(
            categoryId,
            { name, price, maxPerson, facilities, description },
            { new: true }
        )

        if(!updateCategory){
          return res.status(404).send('Category not found')
        }
        res.status(200).json(updateCategory)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})

// Delete Category
app.delete('/roomCategory/:id',  async(req, res) => {
    try {
        const deleteCategory = await RoomCategory.findByIdAndDelete(req.params.id)
        if(!deleteCategory){
            res.status(404).send('Category not found')
        }
        res.status(200).send('Category delete Successfully')
    } catch (error) {
        res.status(500).send(error)
    }
})

// Add new Room
app.post('/room', async(req, res) => {
    try {
        const { roomNumber, roomCategoryId, status } = req.body

        if(!(roomNumber && roomCategoryId )){
            res.status(400).send("All fields are Require")
        }
        // check Room already exitst - roomNumber
        const existingRoom = await Room.findOne({roomNumber})
        if(existingRoom){
            return res.status(401).send(`Room already exists with ${roomNumber} roomNumber`);
        }
        const newRoom = await Room.create({
            roomNumber, 
            roomCategoryId,
            status, 
        })
        res.status(201).send(newRoom) 

    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get All Rooms
app.get('/rooms', async(req, res) => {
    try {
        const allRooms = await Room.find().populate('roomCategoryId', 'name price maxPerson facilities description')
        res.status(200).json(allRooms)
    } catch (error) {
        res.status(500).send(error)
    }
}) 

// Get Single Rooms
app.get('/room/:id',  async(req, res) => {
    // console.log(req.params.id);
    try {
        const room = await Room.findById(req.params.id)
        if(!room){
            return res.status(404).send('Room not found')
        }
        res.status(200).json(room)
    } catch (error) {
        res.status(500).send(error)
    }
})

// Update Room 
app.put('/room/:id', async(req, res) => {
    const roomId = req.params.id
    try {
        const updateRoom = await Room.findByIdAndUpdate(
            roomId,
            req.body,
            {new: true}
        )
        if(!updateRoom){
            res.status(404).send('Room Not Found')
        }
        res.status(200).send(updateRoom)
    } catch (error) {
        res.status(500).send(error)  
    }
})

// Delete Room
app.delete('/room/:id', async(req, res) => {
    try {
        const deleteRoom = await Room.findByIdAndDelete(req.params.id)
        if(!deleteRoom){
            res.status(404).send('User not found')
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


// Booking Room
app.post('/booking', async(req, res) => {
    try{

        const { userId, roomId, checkInDate, checkOutDate, specialRequests, numberOfGuests, totalPrice } = req.body
        // const totalPrice = req.body.totalPrice

        // console.log( userId, roomId, checkInDate, checkOutDate, specialRequests, numberOfGuests );
        // console.log( totalPrice );
        
        // Check if the room is available
        const room = await Room.findById(roomId)
        if (!room) {
            return res.status(404).send("Room not found");
        }

        if (room.status === 'booked') {
            return res.status(400).send("Room is already booked");
        }

        const newBooking = await Booking.create({
            userId,
            roomId,
            checkInDate,
            checkOutDate,
            status: 'pending', 
            totalPrice,
            specialRequests,
            numberOfGuests
        })
    
        // Update Room status
        room.status = 'booked'
        await room.save()
    
        res.status(201).send(newBooking)
    
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// Get All Booking Rooms 
app.get('/bookings', async(req, res) => {
    try {
        const allbokings = await Booking.find().populate('userId').populate('roomId');
      res.status(200).json(allbokings);
    } catch (error) {
        res.status(500).json(error.message)
    }
})

// Get Single Booking Room
app.get('/booking/:id', async(req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('userId').populate('roomId')
        if(!booking){
            return res.status(404).send('Booking not found')
        }
        res.status(200).send(booking)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

// Update Booking 
app.put('/booking/:id', async(req, res) => {
    try {
        const {status} = req.body
        const updateBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            req.body, 
            {new: true}
        )
        if(!updateBooking){
            res.status(404).send('Booking Not Found.')
        }
        if(status === 'cancelled'){
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
app.delete('/booking/:id', async(req, res) => {
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


app.listen(3001, () => {
    console.log('Server is Running....');
})