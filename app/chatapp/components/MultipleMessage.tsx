// app/components/Message.tsx

import React, { useEffect, useRef } from 'react';
import type { Message, ChatViewProps, ImageMessageProps, AudioMessageProps } from '@/types/interfaces';

export default function Message({ messages }: ChatViewProps) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll hacia el final cada vez que cambian los mensajes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={chatContainerRef} 
      className="flex-1 text-gray-900 overflow-y-auto bg-gradient-to-r from-rose-100 via-rose-50 to-rose-50 h-fit overflow-hidden"
    >
      {
        messages.map((message, index) => (
          <MessageItem key={`${message.id}-${index}`} message={message} />
        ))
      }
    </div>
  );
}

const MessageItem = ({ message }: { message: Message }) => {
  if (message.tipo_mensaje === 'imagen') {
    return <ImageMessage message={message} />;
  } else if (message.tipo_mensaje === 'audio') {
    return <AudioMessage message={message} />;
  } else if (message.tipo_mensaje === 'generado') {
    return <GPTMessage message={message} />;
  } else {
    return <TextMessage message={message} />;
  }
};

const TextMessage = ({ message }: { message: Message }) => {
  return (
    <div
      className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'} mb-4 p-4 rounded-lg`}
    >
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
          message.senderId === 'me'
            ? 'bg-gradient-to-b from-[#dcf8c6] to-[#c8e6a0]'
            : 'bg-gradient-to-b from-white to-gray-100'
        }`}
      >
        <p>{message.contenido as string}</p>
        <span className="text-xs mt-1 block text-right">{message.hora}</span>
      </div>
    </div>
  );
};

const ImageMessage = ({ message }: { message: Message }) => {
  return (
    <div
      className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'} mb-4 p-4 rounded-lg`}
    >
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
          message.senderId === 'me'
            ? 'bg-gradient-to-b from-[#dcf8c6] to-[#c8e6a0]'
            : 'bg-gradient-to-b from-white to-gray-100'
        }`}
      >
        <p>{(message.contenido as ImageMessageProps).url_img}</p>
        <p>{(message.contenido as ImageMessageProps).summary}</p>
        <span className="text-xs mt-1 block text-right">{message.hora}</span>
      </div>
    </div>
  );
};

const AudioMessage = ({ message }: { message: Message }) => {
  return (
    <div
      className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'} mb-4 p-4 rounded-lg`}
    >
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
          message.senderId === 'me'
            ? 'bg-gradient-to-b from-[#dcf8c6] to-[#c8e6a0]'
            : 'bg-gradient-to-b from-white to-gray-100'
        }`}
      >
        <p>{(message.contenido as AudioMessageProps).audio_path}</p>
        <p>{(message.contenido as AudioMessageProps).transcription}</p>
        <span className="text-xs mt-1 block text-right text-gray-600">{message.hora}</span>
      </div>
    </div>
  );
};

const GPTMessage = ({ message }: { message: Message }) => {
  return (
    <div className="flex justify-start mb-4 p-4 rounded-lg">
      <div className="max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg bg-gradient-to-b from-white to-gray-100">
        <p>GPT Response</p>
        <span className="text-xs mt-1 block text-right">{message.hora}</span>
      </div>
    </div>
  );
};
