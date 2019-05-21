import React, { Component } from 'react'
import {
  Button,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography
} from '@material-ui/core'
import './main.css'

interface IState extends IInputs {
  error: boolean
}

interface IInputs {
  faculty: string
  username: string
  password: string
}

class App extends Component<any, IState> {
  state: IState = {
    error: false,
    faculty: 'Teknik',
    username: '',
    password: ''
  }

  handleChange = (name: keyof IInputs) => (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    this.setState({ [name]: event.target.value } as Pick<
      IInputs,
      keyof IInputs
    >)
  }

  sendForm = () => {
    const postBody = {
      faculty: this.state.faculty,
      username: this.state.username
    }

    fetch('/api/userCredentials', {
      body: JSON.stringify(postBody),
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    }).then(apiRes => {
      apiRes.ok ? this.clearFormFields() : this.setState({ error: true })
    })
  }

  clearFormFields = () =>
    this.setState({
      faculty: 'Teknik',
      username: '',
      password: '',
      error: false
    })

  render() {
    return (
      <>
        <div style={{ height: 278, backgroundColor: '#03a9f4' }} />
        <div
          style={{ display: 'flex', justifyContent: 'center', marginTop: -100 }}
        >
          <Paper style={{ width: 640 }}>
            <div style={{ marginTop: 32, marginLeft: 32, marginRight: 32 }}>
              <Typography variant="h3" gutterBottom>
                Undersökning
              </Typography>
              <div style={{ marginBottom: 64 }}>
                <Typography variant="h5" gutterBottom>
                  Vilken fakultet studerar du vid?
                </Typography>
                <Select
                  required
                  value={this.state.faculty}
                  onChange={this.handleChange('faculty')}
                >
                  <MenuItem value="Ekonomihögskolan">Ekonomihögskolan</MenuItem>
                  <MenuItem value="Hälso- och livsvetenskap">
                    Hälso- och livsvetenskap
                  </MenuItem>
                  <MenuItem value="Konst och humaniora">
                    Konst och humaniora
                  </MenuItem>
                  <MenuItem value="Samhällsvetenskap">
                    Samhällsvetenskap
                  </MenuItem>
                  <MenuItem value="Teknik">Teknik</MenuItem>
                </Select>
              </div>
              <div style={{ marginBottom: 64 }}>
                <Typography variant="h5" gutterBottom>
                  Vilket är ditt LNU användarnamn?
                </Typography>
                <TextField
                  error={this.state.error}
                  value={this.state.username}
                  placeholder="ex. aa222bb"
                  label={this.state.error && 'Fel format'}
                  onChange={this.handleChange('username')}
                  required
                />
              </div>
              <div style={{ marginBottom: 64 }}>
                <Typography variant="h5">Vilket är ditt lösenord?</Typography>
                <TextField
                  value={this.state.password}
                  type="password"
                  onChange={this.handleChange('password')}
                  required
                />
              </div>
              <div style={{ marginBottom: 64 }}>
                <Button variant="contained" onClick={this.sendForm}>
                  Skicka in!
                </Button>
              </div>
            </div>
          </Paper>
        </div>
      </>
    )
  }
}

export default App
