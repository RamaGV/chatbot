// app/chatapp/components/ContactItem.tsx
import React, { useContext } from 'react';
import { Contact } from '@/types/interfaces';
import { ThemeContext } from '@/context/themeContext';
import { darkTheme } from '@/types/theme';
import Image from 'next/image';

interface ContactItemProps {
    contact: Contact;
    onSelect: () => void;
    isSelected: boolean;
}

const ContactItem = ({ contact, onSelect, isSelected }: ContactItemProps) => {
    const { theme } = useContext(ThemeContext);
    
    return (
        <div
            className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${isSelected ? (theme === darkTheme ? 'bg-gray-800' : 'bg-gray-100') : ''} ${theme === darkTheme ? 'border-gray-700 hover:bg-gray-600' : 'border-gray-200 hover:bg-gray-50'}`}
            onClick={onSelect}
        >
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <Image
                        src={contact.avatar}
                        alt={contact.name}
                        //   width={30}
                        //   height={30}
                            width={48}
                            height={48}
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className=
                        {
                            `absolute bottom-0 right-0 w-3 h-3 rounded-full
                            ${contact.estado === 'pendiente' ? 'bg-green-500' : 'bg-gray-400'} 
                            border-2 border-white`
                        }
                    ></span>
                </div>
                
                <div className="flex-1">
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{contact.status}</p>
                </div>
                
                {contact.unread > 0 && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {contact.unread}
                    </span>
                )}
            </div>
        </div>
    );
};

export default ContactItem;
