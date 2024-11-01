// app/chatapp/components/LeftSidebar.tsx
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import ContactItem from './ContactItem';
import { Contact } from '@/types/interfaces'

interface LeftSidebarProps {
    contacts: Contact[];
    searchQuery: string;
    setSearchQuery: (searchQuery: string) => void;
    setSelectedContact: (contact: Contact) => void;
    selectedContact: Contact | null;
}

const LeftSidebar = ({ contacts, searchQuery, setSearchQuery, setSelectedContact, selectedContact }: LeftSidebarProps) => {
    
    return (
        <div
            className="w-1/4 border-r border-gray-200 flex flex-col"
        >
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <FiSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar contactos"
                        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                {contacts
                    .filter((contact: Contact) =>
                        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((contact: Contact) => (
                        <ContactItem
                            key={contact.id}
                            contact={contact}
                            onSelect={() => setSelectedContact(contact)}
                            isSelected={contact.id === selectedContact?.id}
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default LeftSidebar;
