export const CREATE = 'CREATE';


export const createProjectForm = (data:any) => (dispatch: any) => {
    dispatch({
        type: CREATE,
        data: data
     })
   }