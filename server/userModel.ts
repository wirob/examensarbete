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

export async function createUser(userData: IPostBody) {
  User.sync().then(() => {
    User.create(userData).then(user => {
      console.log(user.faculty, user.username)
      return { faculty: user.faculty, username: user.username }
    })
  })
}
