// app/chatapp/components/ChatView.tsx
import { FiPhone, FiVideo, FiMoreVertical } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import Message from '@/app/chatapp/components/MultipleMessage';
import { ChatViewProps } from '@/types/interfaces';
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';

const ChatView: React.FC<ChatViewProps> = ({
    messages,
    selectedContact,
    generatedResponses,
    selectedResponse,
    handleResponseSelection,
}) => {
    const chatContainerRef = useRef(null);
    const previousGeneratedResponsesLength = useRef(generatedResponses.length);
    const generatedResponsesHeightRef = useRef(0);
    const generatedResponsesRef = useRef(null);


    useEffect(() => {
        const timeout = setTimeout(() => {
          if (chatContainerRef.current) {
            if (generatedResponses.length > 0) {
              // Desplazar hacia abajo cuando aparecen las respuestas generadas
              chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth',
              });
            } else if (
              previousGeneratedResponsesLength.current > 0 &&
              generatedResponses.length === 0
            ) {
              // Ajustar posición del scroll cuando desaparecen las respuestas generadas
              chatContainerRef.current.scrollTo({
                top:
                  chatContainerRef.current.scrollTop -
                  generatedResponsesHeightRef.current,
                behavior: 'smooth',
              });
            }
            previousGeneratedResponsesLength.current = generatedResponses.length;
          }
        }, 200);
      
        return () => clearTimeout(timeout);
      }, [generatedResponses, messages]);
      
    
    useEffect(() => {
        if (generatedResponsesRef.current && generatedResponses.length > 0) {
            generatedResponsesHeightRef.current = generatedResponsesRef.current.offsetHeight;
        }
    }, [generatedResponses]);
      
    return (
        <div className="flex-1 flex flex-col relative bg-gradient-to-r from-rose-100 via-rose-50 to-rose-50">
            {selectedContact ? (
                <>
                    {/* Chat Header */}
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <Image
                                src={selectedContact.avatar}
                                alt={selectedContact.name}
                                width={48}
                                height={48}
                            />
                            <div>   
                                <h2 className="font-semibold">{selectedContact.name}</h2>
                                <p className="text-sm text-gray-500">{selectedContact.estado}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <FiPhone className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <FiVideo className="w-5 h-5 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <FiMoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                    
                    {/* Messages */}

                    <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
                        <Message 
                            messages={messages}
                            selectedContact={selectedContact}
                            generatedResponses={generatedResponses}
                            selectedResponse={selectedResponse}
                            handleResponseSelection={handleResponseSelection}
                        />
                    </div>
                    
                    {/* Generated Responses */}
                    <AnimatePresence>
                        {generatedResponses.length > 0 && (
                            <motion.div
                            ref={generatedResponsesRef}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-2 p-4"
                            >
                            {generatedResponses.map((response, index) => (
                                <motion.div
                                key={index}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer max-w-[70%] ${
                                    selectedResponse === response ? 'border-2 border-blue-500' : ''
                                }`}
                                onClick={() => handleResponseSelection(response)}
                                >
                                <p>{response}</p>
                                </motion.div>
                            ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">Seleccionar un contacto para comenzar</p>
                </div>
            )}
        </div>
    );
};

export default ChatView;
