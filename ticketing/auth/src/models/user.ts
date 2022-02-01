import mongoose from 'mongoose'
import Password from '../services/password'

/**
 * An interface that describes the properties
 * that are required to create a new User
 */
interface UserAttributes {
  email: string
  password: string
}

/**
 * An interface that describes the properties
 * that a User Model has
*/
interface UserModel extends mongoose.Model<UserDocument> {
  build(attributes: UserAttributes): UserDocument
}

/**
 * An interface that describes the properties
 * that a User Document has
 */
interface UserDocument extends mongoose.Document {
  email: string
  password: string
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  }
})

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'))
    this.set('password', hashedPassword)
  }

  done()
})

userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes)
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema)

export { User }
