import axios from 'axios';
import axiosConfig from '../config/axiosConfig';
import { ResourceType } from '../types/ResourceType';
import { SøknadApiData } from '../types/SøknadApiData';
import { getApiUrlByResourceType } from '../utils/apiUtils';

export const getSøker = () => axios.get(getApiUrlByResourceType(ResourceType.SØKER), axiosConfig);

export const sendApplication = (data: SøknadApiData) =>
    axios.post(getApiUrlByResourceType(ResourceType.SEND_SØKNAD), data, axiosConfig);
