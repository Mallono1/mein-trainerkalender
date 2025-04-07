import { createContext, useState } from 'react';

const SidebarContext = createContext(null);

const SidebarContextProvider = () => {
  const [open, setOpen] = useState<boolean>(true);
};
