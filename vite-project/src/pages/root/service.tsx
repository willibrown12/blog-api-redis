import axios from 'axios';




export const FETCH_USER = 'fetch_user';
export const FETCH_BLOGS = 'fetch_blogs';
export const FETCH_BLOG = 'fetch_blog';



export const fetchUser = () => async (dispatch: any)=> {
  const res = await axios.get('http://localhost:5000/api/current_user', {
   
  });

  dispatch({ type: FETCH_USER, payload: res.data });
};





export async function SendToApiHome() {
   
  const url = `http://localhost:3000/home`;
    const result = await axios.get<{ cards:homeCardApi[]}>(url)
 
    
    const data= result?.data?.cards.map((c:homeCardUI) => {
      return {
    
        country: c.country,
        city: c.city,
        image_url: c.image_url,
      }})
     ;
     
      
      return data;
     }




export const handleToken = token => async  (dispatch: any) => {
  const res = await axios.post('http://localhost:5000/api/stripe', token, {
    
  });

  dispatch({ type: FETCH_USER, payload: res.data });
};











export const submitBlog = (values, history) => async  (dispatch: any) => {
  const res = await axios.post('http://localhost:5000/api/blogs', values, {
    withCredentials: true
  });

  history.push('/blogs');
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async  (dispatch: any) => {
  const res = await axios.get('http://localhost:5000/api/blogs', {
    withCredentials: true
  });

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async  (dispatch: any) => {
  const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
    withCredentials: true
  });

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
