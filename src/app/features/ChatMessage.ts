import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageType } from '../../interfaces';

interface IMessageType {
    messages: MessageType[];
}

const initialState: IMessageType = {
    messages: [], 
}

export const chatMessageSlice = createSlice({
    name: "chatMessage",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<MessageType>) => {
            state.messages.push(action.payload);
        },
        clearMessages: (state) => {
            state.messages = [];
        },
    }
})

export const { addMessage, clearMessages } = chatMessageSlice.actions;
export default chatMessageSlice.reducer;