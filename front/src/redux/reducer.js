import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    isLoggedIn: false, 
    appointments: [],
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.logged;
    },
    logout: (state) => {
      state.user = {};
      state.isLoggedIn = false;
      state.appointments = [];  
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
    cancelAppointment: (state, action) => {
      state.appointments = state.appointments.map((appointment) => {
        if (appointment.id === action.payload) {
          return { ...appointment, status: "cancelled" };
        }
        return appointment;
      });
    },

    addAppointment: (state, action) => {
      state.appointments.push(action.payload); // Agrega el nuevo turno al array de turnos
    },

    
  },
})

export const { loginSuccess, cancelAppointment, logout, setAppointments, addAppointment } = userSlice.actions

export default userSlice.reducer;


