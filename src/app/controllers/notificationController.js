import notificationsModel from "../models/notificationsModel.js";
import express from 'express';

class NewsController{

    async getAll(id){
        try {
            const notifications = await notificationsModel.find({ user: id })
              .sort({ read: 1, createdAt: -1 })
              .exec();
            return notifications;
          } catch (error) {
            sendErrorNotification(error.toString()+"\n \n \n notificationController linha 13");
            return false;
          }
    }

    async read(id){
      const read = await notificationsModel.findByIdAndUpdate({ _id: id.id }, { read:true})
    }

    async delete(){

    }
}

export default new NewsController();