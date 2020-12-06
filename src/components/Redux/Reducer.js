
const initialState = {
    data:[]
 };

const Reducer = (state = initialState, action) => {
    switch (action.type) {

       case 'ADD_TO_VIEW': return{
            ...state,
            data:action.payload
        }
    
       default:
          return state;
    }
 }
 export default Reducer;