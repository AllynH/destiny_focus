/* eslint-disable camelcase */
import React from 'react'
import Route from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { increment, setPvp, setGambit, setRaid } from '../Actions'

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false)
  const [killDeathRatio, setKillDeathRatio] = React.useState(0)
  const [winLossRatio, setWinLossRatio] = React.useState(0)
  const [precisionShotsLanded, setPrecisionShotsLanded] = React.useState(0)
  const [avgLifeTime, setAvgLifeTime] = React.useState(0)
  const [selFocus, setFocus] = React.useState('')
  const [helperText, setHelperText] = React.useState('')
  const [error, setError] = React.useState(false)
  const [values, setValues] = React.useState({
    killDeathRatio: 0,
    winLossRatio: 0,
    precisionShotsLanded: 0,
    helperText: '',
  })

  const getFocus = useSelector((state) => state.focus)
  const counter = useSelector((state) => state.counter)
  const dispatch = useDispatch()

  const { focus, apiUrl, image, colours, description } = props.focus_details

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (e) => {
    console.log('customForm focus', focus)
    // let new_focus = 'pvp'
    // if (focus === 'Crucible') {
    //   new_focus = 'pvp'
    // }
    e.preventDefault()
    setOpen(false)
    console.log('Submit')
    console.log('focus', focus)
    console.log('killDeathRatio', killDeathRatio)
    console.log('winLossRatio', winLossRatio)
    console.log('precisionShotsLanded', precisionShotsLanded)
    console.log('avgLifeTime', avgLifeTime)
    if (!error) {
      setFocus(focus)
      setKillDeathRatio(killDeathRatio)
      setWinLossRatio(winLossRatio)
      setPrecisionShotsLanded(precisionShotsLanded)
      setAvgLifeTime(avgLifeTime)
      // console.log(store.getState())
      console.log('Dispatching actions:')
      dispatch(increment(2))
      if (focus === 'pvp') {
        console.log('Setting focus -> ', focus)
        dispatch(setPvp({ killDeathRatio, winLossRatio, precisionShotsLanded, avgLifeTime }))
      }
      else if (focus === 'gambit') {
        console.log('Setting focus -> ', focus)
        dispatch(setGambit({ killDeathRatio, winLossRatio, precisionShotsLanded, avgLifeTime }))
      }
      else {
        console.log('Setting focus -> ', focus)
        dispatch(setRaid({ killDeathRatio, winLossRatio, precisionShotsLanded, avgLifeTime }))
      }
    } else {
      // eslint-disable-next-line no-alert
      alert('Please fix the errors.')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const val = testNumber(value)
    if (!val) {
      // console.log('Setting state for errors...')
      setHelperText('Must be a number.')
      setError(true)
    } else {
      setHelperText('')
      setError(false)
      setValues({ ...values, [name]: value })
      setFocus(focus)
    }
  }

  const testNumber = (num) => !isNaN(num)

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Customize Focus
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Focus: {focus}</DialogTitle>

        {/* {props.chilillDeathRatioen ? props.chilillDeathRatioen : <h2>No chilillDeathRatioen...</h2>} */}

        <DialogContent>
          <DialogContentText>
            Customize your focus goals: How many headshots have you landed today?
          </DialogContentText>
          <TextField
            autoFocus
            helperText={helperText}
            error={error}
            margin='dense'
            id='pvp-killDeathRatio'
            placeholder='1.5'
            label='Kill Death Ratio'
            type='int'
            fullWidth
            onInput={(killDeathRatio) => setKillDeathRatio(killDeathRatio.target.value)}
            // onInput={(killDeathRatio) => killDeathRatio.target.value}
            onChange={handleInputChange}
          />
          <TextField
            helperText={helperText}
            error={error}
            margin='dense'
            id='winLossRatio'
            placeholder='75'
            label='Win Loss Ratio (percent)'
            type='int'
            fullWidth
            onInput={(winLossRatio) => setWinLossRatio(winLossRatio.target.value)}
            onChange={handleInputChange}
          />
          <TextField
            helperText={helperText}
            error={error}
            margin='dense'
            id='precisionShotsLanded'
            placeholder='10'
            label='Precision Kills per game (count)'
            type='int'
            fullWidth
            onInput={(precisionShotsLanded) => setPrecisionShotsLanded(precisionShotsLanded.target.value)}
            onChange={handleInputChange}
          />
          <TextField
            helperText={helperText}
            error={error}
            margin='dense'
            id='avgLifeTime'
            placeholder='90'
            label='Average time alive (seconds)'
            type='int'
            fullWidth
            onInput={(avgLifeTime) => setAvgLifeTime(avgLifeTime.target.value)}
            onChange={handleInputChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color='default'>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color='primary'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

// export connect(FormDialog)
