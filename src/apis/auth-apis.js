import axios from 'axios';
import {BASE_URL} from './apis';

export const onLogin = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/login`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: details?.email,
          password: details?.password,
        },
      });
      const {data} = await response;
      console.log('response here for login', response);
      resolve(data);
    } catch (error) {
      console.log('login', 'error', error);
      reject(error);
    }
  });

export const onRegister = async details =>
  new Promise(async (resolve, reject) => {
    try {
      console.log('email will be', details?.email);
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/register`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: details?.email,
          password: details?.password,
        },
      });
      const {data} = await response;
      console.log('response here for register', response);
      resolve(data);
    } catch (error) {
      console.log('register', 'error', error);
      reject(error);
    }
  });

export const updateProfileList = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/updateProfile/${details?.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          name: details?.name,
          username: details?.username,
          bio: details?.bio,
          token: details?.token,
        },
      });
      const {data} = await response;
      console.log('response here for Updateprofile', response);
      resolve(data);
    } catch (error) {
      console.log('Updateprofile', 'error', error);
      reject(error);
    }
  });

export const onProfileDetail = async details =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}/getProfile/${details?.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          taken: details?.token,
        },
      });
      const {data} = await response;
      console.log('response here for getprofile', response);
      resolve(data);
    } catch (error) {
      console.log('getprofile', 'error', error);
      reject(error);
    }
  });
export const onUpdate_passwordApi = async details => {
  try {
    const formData = new FormData();
    formData.append('email', details.email);
    formData.append('password', details.password);
    formData.append('code', details.code);

    const response = await axios.post(
      `${BASE_URL}/update_passwordApi`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log('Response for updatePasswordApi:', response.data);
    return response.data;
  } catch (error) {
    console.log('updatePasswordApi error:', error);
    throw error;
  }
};

export const onVerify_code = async details => {
  try {
    const formData = new FormData();
    formData.append('email', details.email);
    formData.append('code', details.code);

    const response = await axios.post(`${BASE_URL}/verify_code`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response for VerifyCode:', response.data);
    return response.data;
  } catch (error) {
    console.log('VerifyCode error:', error);
    throw error;
  }
};

export const onResetPassword = async details => {
  try {
    const formData = new FormData();
    formData.append('email', details.email);

    const response = await axios.post(`${BASE_URL}/resetPassword`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response here for ResetPassword:', response.data);
    return response.data;
  } catch (error) {
    console.log('ResetPassword error:', error);
    throw error;
  }
};

export const onDeleteAccount = async details => {
  try {
    const formData = new FormData();

    formData.append('token', details.token);
    console.log(formData);

    const response = await axios.post(
      `${BASE_URL}/deleteuser_history`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    console.log('Response for deletingAccount:', response.data);
    return response.data;
  } catch (error) {
    console.log('deletingAccount error:', error);
    throw error;
  }
};
