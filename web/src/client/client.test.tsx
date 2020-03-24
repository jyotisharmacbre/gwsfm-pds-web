import * as client from './client';

describe('client interceptors functions run without error', () => {
    let successData = { data: 'test' };
    let errorObject = {
        statusText: 'NotFound',
        status: 404,
        data: { message: 'Page not found' }
    };
    it('baseAPI should return the correct value when api return success', () => {
        expect(client.baseAPI.interceptors.response.handlers[0].fulfilled(successData)).toEqual(successData);
    });

    it('userServiceAPI should return the correct value when api return success', () => {
        expect(client.userServiceAPI.interceptors.response.handlers[0].fulfilled(successData)).toEqual(successData);
    });

    it('baseAPI should return the correct value when api return 404 error', () => {
        expect(client.baseAPI.interceptors.response.handlers[0].rejected({
            response: errorObject
        })).rejects.toMatchObject(errorObject)
    });

    it('userServiceAPI should return the correct value when api return 404 error', () => {
        expect(client.userServiceAPI.interceptors.response.handlers[0].rejected({
            response: errorObject
        })).rejects.toMatchObject(errorObject)
    });
});
