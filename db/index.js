import mongoose from 'mongoose';
// mongo DB conf
mongoose.connect('mongodb://db_user:db_pass2018@ds145981.mlab.com:45981/titus_db');
// const Cat = mongoose.model('Cat', { name: String });
// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

export default mongoose;
