import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'modules/libs/Form'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Avatar, TextField, Grid } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useModuleStores } from 'modules/stores/use-module-stores'
import { observer } from 'mobx-react-lite'
import BusyButton from 'modules/components/atoms/BusyButton'
import LoginFooter from 'modules/components/molecules/LoginFooter'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  },
  form: {
    marginTop: theme.spacing(6)
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none'
  }
}))

const Login: React.FC = () => {
  const classes = useStyles()
  const { appStore, userStore } = useModuleStores()

  return (
    <div className={classes.root}>
      <Container component="main" className={classes.main} maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {appStore.config?.appName}
          </Typography>
          <Form
            error={userStore.firebase.error?.message}
            className={classes.form}
            fields={[
              {
                name: 'email',
                label: 'Email',
                placeholder: 'Digite seu Email',
                rules: 'required|email|string|between:5,25'
              },
              {
                name: 'password',
                label: 'Senha',
                placeholder: 'Digite sua senha',
                rules: 'required|string|between:5,25'
              }
            ]}
            render={form => (
              <>
                <TextField
                  {...form.$('email').bind()}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  autoComplete="email"
                  autoFocus
                  error={!!form.$('email').error}
                  helperText={form.$('email').error}
                />
                <TextField
                  {...form.$('password').bind()}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  autoComplete="current-password"
                  error={!!form.$('password').error}
                  helperText={form.$('password').error}
                />
                <BusyButton
                  busy={userStore.firebase.busy}
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={form.onSubmit}
                  className={classes.submit}
                >
                  Entrar
                </BusyButton>
                <Grid container>
                  <Grid item xs>
                    <Link to="recover" className={classes.link}>
                      Esqueceu sua senha?
                    </Link>
                  </Grid>
                  {appStore.config?.allowNewUsers && (
                    <Grid item>
                      <Link to="register" className={classes.link}>
                        Não tem conta?
                      </Link>
                    </Grid>
                  )}
                </Grid>
              </>
            )}
            onSubmit={values =>
              userStore
                .login(values.email, values.password)
                .catch(e => console.log(e))
            }
          />
        </div>
      </Container>
      <LoginFooter />
    </div>
  )
}

export default observer(Login)
