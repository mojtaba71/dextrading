import { create } from "zustand";

export type GlobalState = {
    isPaid: boolean;
    setIsPaid: (isPaid: boolean) => void;

};

//create a global store for the app
const useGlobalStore = create<GlobalState>((set, get) => ({
    //set the global state
    isPaid: false,

    //set the global actions
    //set the global action to update the isPaid state
    setIsPaid: (payload: boolean) => {
        set({ isPaid: payload });
    },

}));

export default useGlobalStore;

