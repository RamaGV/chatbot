// app/chatapp/components/MessageItem.tsx
import React from 'react';
import { Message } from '@/types/interfaces';

const MessageItem = ({ message }: { message: Message } ) => {
  return (
    <div
        className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'} mb-4 p-4 rounded-lg text-gray-950`}
    >
        <div
            className={`max-w-[70%] rounded-lg p-3 
                ${ message.senderId === 'me' ? 'bg-gradient-to-b from-[#dcf8c6] to-[#c8e6a0]' : 'bg-gradient-to-b from-white to-gray-100'}`
            }
        >
            {message.type === 'text' ? 
            (
                <p>{message.text}</p>
            ) : (
                <img
                    src={`https://${message.text}`} // Acá debe ir la URL de la imagen
                    alt="Shared content"
                    className="rounded-lg max-w-full w-64 h-64 object-cover"
                />
            )}
            <span className="text-xs text-gray-600 mt-1 block text-right">{message.timestamp}</span>
        </div>
    </div>
  );
};

export default MessageItem;
