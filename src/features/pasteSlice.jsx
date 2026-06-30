import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem('pastes')
    ? JSON.parse(localStorage.getItem('pastes'))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload
      const data = JSON.parse(localStorage.getItem('pastes')) || []
      const titles = data.map(item => item.title);

      if (titles.indexOf(paste.title) === -1) {
        state.pastes.push(paste);
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success('Paste created successfully! 🎉', {
          icon: '✨',
          duration: 3000,
        });
      }
      else {
        toast.error('A paste with this title already exists', {
          duration: 3000,
        })
      }
    },
    updateToPastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) =>
        item._id === paste._id
      )
      if (index >= 0) {
        state.pastes[index] = paste
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success('Paste updated successfully! ✅', {
          duration: 3000,
        })
      }
    },
    resetToPastes: (state, action) => {
      state.pastes = []
      localStorage.removeItem('pastes')
      toast.success('All pastes cleared')
    },
    reomveFromPastes: (state, action) => {
      const pasteId = action.payload
      const index = state.pastes.findIndex((item) =>
        item._id === pasteId)
      if (index >= 0) {
        const removedTitle = state.pastes[index].title;
        state.pastes.splice(index, 1);
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success(`"${removedTitle}" deleted successfully`, {
          duration: 2500,
        })
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetToPastes, reomveFromPastes } = pasteSlice.actions

export default pasteSlice.reducer