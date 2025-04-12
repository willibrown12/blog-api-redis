import axios from 'axios';
import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('http://localhost:5000/api/current_user', {
   
  });

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('http://localhost:5000/api/stripe', token, {
    
  });

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (values, history) => async dispatch => {
  const res = await axios.post('http://localhost:5000/api/blogs', values, {
    withCredentials: true
  });

  history.push('/blogs');
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async dispatch => {
  const res = await axios.get('http://localhost:5000/api/blogs', {
    withCredentials: true
  });

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async dispatch => {
  const res = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
    withCredentials: true
  });

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
