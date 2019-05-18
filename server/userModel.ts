import { DataTypes, Model } from 'sequelize'
import sequelize from './sequelize'

class User extends Model {
  public faculty!: string
  public username!: string

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    faculty: {
      allowNull: false,
      type: new DataTypes.STRING(128)
    },
    username: {
      allowNull: true,
      type: new DataTypes.STRING(128)
    }
  },
  {
    sequelize, // this bit is important
    tableName: 'users'
  }
)

export function createUser(userData: IPostBody) {
  return new Promise((resolve, reject) => {
    User.sync()
      .then(() => {
        User.create(userData).then(user => {
          resolve({ faculty: user.faculty, username: user.username })
        })
      })
      .catch(err => reject(err))
  })
}
