// app/chatapp/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import LeftSidebar from './components/LeftSidebar';
import ChatView from './components/ChatView';
import RightSidebar from './components/RightSidebar';
import ActionButton from './components/ActionButton';
import { Contact } from '@/types/interfaces'
import { ThemeContext } from '@/context/themeContext';
import { useContext } from 'react';
import { darkTheme } from '@/types/theme';

const ChatAppPage = () => {
    const { theme } = useContext(ThemeContext);
    
    // State variables
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [selectedContact, setSelectedContact] = useState<Contact  | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
    const [showResponseInput , setShowResponseInput] = useState(false);
    const [customResponse, setCustomResponse] = useState<string  | null>(null) ;
    const [generatedResponses, setGeneratedResponses] = useState<string[] | null>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedResponse, setSelectedResponse] = useState<string  | null>(null) ;
    const [showEditButtons, setShowEditButtons] = useState(false);
    const [messages, setMessages] = useState([]);
    
    useEffect(() => {
        // Cargar contactos desde la API
        const loadContacts = async () => {
          try {
            const response = await fetch('http://localhost:8000/contacts');
            const data = await response.json();
            // Truncar los mensajes a 40 caracteres sin cortar palabras
            const updatedContacts = data.map((contact: Contact) => {
              if (contact.last_message.length > 40) {
                const truncatedMessage = contact.last_message.substring(0, 40);
                const lastSpaceIndex = truncatedMessage.lastIndexOf(' ');
                contact.last_message = lastSpaceIndex > 0 ? truncatedMessage.substring(0, lastSpaceIndex) + '...' : truncatedMessage + '...';
              }

              return contact;
            });
            
            setContacts(updatedContacts);
            if (updatedContacts.length > 0) {
              setSelectedContact(updatedContacts[0]);
            }
          } catch (error) {
            console.error('Error loading contacts:', error);
          }
        };
        
        loadContacts();
    }, []);
    
    useEffect(() => {
        // Cargar mensajes para el contacto seleccionado
        const loadMessages = async () => {
        if (!selectedContact) return;
        try {
            const response = await fetch(`http://localhost:8000/messages/${selectedContact.id}`);
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
        };
        loadMessages();
    }, [selectedContact]);
    
    // const sharedFiles = [
    //     {
    //     id: 1,
    //     name: "Project_Brief.pdf",
    //     type: "pdf",
    //     size: "2.5 MB"
    //     },
    //     {
    //     id: 2,
    //     name: "Design_Assets.zip",
    //     type: "zip",
    //     size: "15 MB"
    //     }
    // ];
    
    const handleRequestAI = () => {
        try {
            setGeneratedResponses([
                "I've reviewed the project details and would be happy to help with the implementation.",
                "Based on our previous discussion, I can provide guidance on the technical requirements.",
                "Let's schedule a call to discuss the project scope in more detail."
            ]);
            setShowEditButtons(false);
            setSelectedResponse(null);
        } catch {
            setErrorMessage("Ha ocurrido un error al procesar su solicitud.");
            setTimeout(() => setErrorMessage(""), 3000);
        }
    };
    
    const handleResponseSelection = (response: string) => {
        // Si se selecciona una respuesta, mostrar los botones de edición
        // y establecer la respuesta seleccionada

        setSelectedResponse(response);
        setShowEditButtons(true);
    };
    
    const handleEditResponse = () => {
        setCustomResponse(selectedResponse);
        setShowResponseInput(true);
        setShowEditButtons(false);
    };
    
    const handleRequestVariant = () => {
        const variants = [
        `Alternative version: ${selectedResponse}`,
        `Different approach: ${selectedResponse}`,
        `New perspective: ${selectedResponse}`
        ];
        setGeneratedResponses(variants);
        setShowEditButtons(false);
        setSelectedResponse(null);
    };
    
    const handleSendResponse = () => {
        console.log("Sending response:", selectedResponse);
        setShowEditButtons(false);
        setIsActionMenuOpen(false);
        setSelectedResponse(null);
        setGeneratedResponses([]);
    };
    
    const handleSelectedContact = (contact: Contact) => {
        setSelectedContact(contact);
    };
    
    return (
        <div className={`flex h-screen relative ${
            theme === darkTheme ? 'bg-dark-background' : 'bg-light-background'
          }`}
        >
            {/* Left Sidebar */}
            <LeftSidebar
                contacts={contacts}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectedContact={handleSelectedContact}
                selectedContact={selectedContact}
            />
            
            {/* Chat View */}
            <ChatView
                selectedContact={selectedContact}
                messages={messages}
                generatedResponses={generatedResponses ?? []}
                selectedResponse={selectedResponse ?? ''}
                handleResponseSelection={handleResponseSelection}
            />
            
            {/* Right Sidebar */}
            {/* {selectedContact && <RightSidebar sharedFiles={sharedFiles} />} */}
            
            {/* Action Button */}
            
            <ActionButton
                isActionMenuOpen={isActionMenuOpen}
                setIsActionMenuOpen={setIsActionMenuOpen}
                showEditButtons={showEditButtons}
                generatedResponses={generatedResponses}
                selectedResponse={selectedResponse}
                handleRequestAI={handleRequestAI}
                handleSendResponse={handleSendResponse}
                handleEditResponse={handleEditResponse}
                handleRequestVariant={handleRequestVariant}
                setShowEditButtons={setShowEditButtons}
                setSelectedResponse={setSelectedResponse}
                setGeneratedResponses={setGeneratedResponses} 
            />
        </div>
    );
};

export default ChatAppPage;
