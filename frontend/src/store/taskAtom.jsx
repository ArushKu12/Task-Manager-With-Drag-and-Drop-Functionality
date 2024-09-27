import { atom, selector } from 'recoil'
import { getRequestAxios } from '../services/requests';
import { taskAPI } from '../services/apis';

export const taskAtom = atom({
    key:'taskAtom',
    default:[]
})

