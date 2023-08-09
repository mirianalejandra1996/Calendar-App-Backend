const { response } = require("express");
const Event = require("../models/Event")

const getEvents = async (req, res = response) => {
    
   try {
    const events = await Event.find()
                              .populate('user', 'name')
                              // .populate('user', 'name password') // Only an example to get another property

    res.json({
      ok: true,
      events,
    });
   } catch (error) {
      res.status(500).json({
        ok: false,
        msg: 'Error getting all events'
      })
   }
}

const createEvent = async (req, res = response) => {
  
  const event = new Event(req.body)
  
  try {
    
    event.user = req.uid

    const savedEvent = await event.save()
      
    res.json({
      ok: true,
      event: savedEvent,
    });

    } catch (error) {
      console.log('error', error)
      res.status(500).json({
        ok: false,
        msg: 'Please contact with the admin'
      })
    }

   
}

const updateEvent = async (req, res = response) => {
    
  const  eventID = req.params.id
  const { uid } = req
    
    try {

      const event = await Event.findById(eventID)

      if (!event) {
        return res.status(404).json({
          ok: false,
          msg: 'Event not found by id'
        })
      }

      if (event.user.toString() !== uid) {
        return res.status(401).json({
          ok: false,
          msg: 'You have not permissions to update this event'
        })
      }

      const newEvent = {
        ...req.body,
        user: uid
      }

      const updatedEvent = await Event.findByIdAndUpdate(eventID, newEvent, { new: true })

      res.json({
        ok: true,
        event: updatedEvent
      });
      // .populate('user', 'name')
      
    } catch (error) {
      console.log('error', error)
      res.status(500).json({
        ok: false,
        msg: 'Please contact with the admin'
      })
    }

    
}

const deleteEvent = async (req, res = response) => {
    
  const  eventID = req.params.id
  const { uid } = req
    
    try {

      const event = await Event.findById(eventID)

      if (!event) {
        return res.status(404).json({
          ok: false,
          msg: 'Event not found by id'
        })
      }

      if (event.user.toString() !== uid) {
        return res.status(401).json({
          ok: false,
          msg: 'You have not permissions to delete this event'
        })
      }

      // const removedEvent = await Event.findByIdAndDelete(eventID)
      await Event.findByIdAndDelete(eventID)

      res.json({
        ok: true,
        // event: removedEvent
      });
      
    } catch (error) {
      console.log('error', error)
      res.status(500).json({
        ok: false,
        msg: 'Please contact with the admin'
      })
    }
}




module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};