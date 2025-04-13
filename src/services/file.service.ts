import { IUser } from '@/store/user/user.types';
import { SOURCE } from './sources.const';

export interface SendFileMessage {
    formData: FormData;
    token: string;
}

export interface ChangeProfilePicture {
    formData: FormData;
    token: string;
}

export interface SendFileMessageResponse {
    userId: string,
    messageId: string,
    message: {
        pictures: Array<string>,
        message: string
    },
    writed: string,
    read: string
}

export interface SendFileMessagePromise {
    body: ReadableStream;
    bodyUsed: boolean;
    headers: Headers
    ok: boolean;
    redirected: boolean;
    status: number;
    statusText: string;
    type: string;
    url: string;
}

class FileService {
    async sendFileMessage({ formData, token }: SendFileMessage): Promise<Response> {
        try {
            const response = await fetch(`${SOURCE}/chat/send/photo`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            return response;
        } catch (error) {
            throw new Error();
        }
    }

    async changeProfilePicture({ formData, token }: ChangeProfilePicture): Promise<Response> {
        try {
            const response = await fetch(`${SOURCE}/users/profile/photo`,
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );
            
            return response;
        } catch (error) {
            throw new Error();
        }
    }
}

export default new FileService();
