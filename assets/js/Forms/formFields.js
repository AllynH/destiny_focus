import React from 'react';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export function CrucibleFormFields() {
  return (
      <DialogContent>
        <DialogContentText>
          Customize your focus goals: How many headshots have you landed today?
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='pvp-kdr'
          // inputRef={($el) => {
          //   // you got the input value here
          //   console.log($el.id)
          //   const inputValue = $el.id
          // }}
          placeholder='1.5'
          label='Kill Death Ratio'
          type='int'
          fullWidth
          // onInput={e => e}
        />
        <TextField
          margin='dense'
          id='wlr'
          placeholder='75'
          label='Win Loss Ratio (percent)'
          type='email'
          fullWidth
        />
        <TextField
          margin='dense'
          id='psl'
          placeholder='50'
          label='Precision Shots Landed (count)'
          type='email'
          fullWidth
        />
      </DialogContent>
  )
}

export function GambitFormFields() {
  return (
      <DialogContent>
        <DialogContentText>
          Customize your focus goals: Melt that Primeval.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='pve-kdr'
          placeholder='30'
          label='Kill Death Ratio'
          type='int'
          fullWidth
        />
        <TextField
          margin='dense'
          id='ikc'
          placeholder='10'
          label='Invasion Kill Count'
          type='email'
          fullWidth
        />
        <TextField
          margin='dense'
          id='pve-damage'
          placeholder='250,000'
          label='Primeval Damage'
          type='email'
          fullWidth
        />
      </DialogContent>
  )
}

export function RaidFormFields() {
  return (
      <DialogContent>
        <DialogContentText>
          Customize your focus goals: MORE DPS!
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='pve-kdr'
          placeholder='100'
          label='Kill Death Ratio'
          type='int'
          fullWidth
        />
        <TextField
          margin='dense'
          placeholder='250,000'
          label='Boss Damage'
          type='email'
          fullWidth
        />
      </DialogContent>
  )
}
