import axios from 'axios';
const BASE_URL = 'https://collectionapi.metmuseum.org/public/collection/v1'; 
/* Returned an error when using BASE_URL. Will troublshoot later -BD */

export const getDepartments = async () => {
  try {
    const { data } = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/departments');
    return data.departments;
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};

export const searchObjects = async (query: string, departmentId?: number) => {
    const url = new URL('https://collectionapi.metmuseum.org/public/collection/v1/search');
    url.searchParams.append('q', query);
    if (departmentId) url.searchParams.append('departmentId', departmentId.toString());

    const { data } = await axios.get(url.toString());   
    return data.objectIDs || []
};

export const getObjectDetails = async (objectID: number) => {
  if (!objectID || isNaN(Number(objectID))) {
    throw new Error('Invalid object ID');
  }

  const { data } = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
  return data;
};