import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  IconButton,
  Typography,
  styled,
  Avatar
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import EmailIcon from '@mui/icons-material/Email';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #888 transparent;
  }
`;

const StyledSelect = styled(Select)({
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    maxHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  padding: '24px 24px 0 24px',
});

const StyledDialogContent = styled(DialogContent)(() => ({
  padding: '0px',
}));

const StyledDialogActions = styled(DialogActions)({
  padding: '24px',
  justifyContent: 'space-between',
});

const StyledListItem = styled(ListItem)({
  paddingLeft: "24px",
  paddingRight: "24px",
});

const StyledTextField = styled(TextField)({
  '& .MuiInputLabel-root': {
    transform: 'translate(14px, 17px) scale(1)',
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(14px, -6px) scale(0.75)',
  },
});

const ScrollableList = styled(List)({
  overflowY: 'auto',
  flexGrow: 1,
  maxHeight: 'calc(70vh - 300px)', // Adjust this value as needed
});

const mockUsers = [
  { id: 0, name: 'You', email: 'you@example.com', access: 'Owner', isOwner: true },
  { id: 1, name: 'John Doe', email: 'johndoe@example.com', access: 'Viewer' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', access: 'Commentor' },
  { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com', access: 'Editor' },
  { id: 4, name: 'Alice Brown', email: 'alicebrown@example.com', access: 'Viewer' },
  { id: 5, name: 'Charlie Davis', email: 'charliedavis@example.com', access: 'Commentor' },
  { id: 6, name: 'Eva White', email: 'evawhite@example.com', access: 'Editor' },
  { id: 7, name: 'Frank Miller', email: 'frankmiller@example.com', access: 'Viewer' },
  { id: 8, name: 'Grace Lee', email: 'gracelee@example.com', access: 'Commentor' },
  { id: 9, name: 'Henry Wilson', email: 'henrywilson@example.com', access: 'Editor' },
  { id: 10, name: 'Ivy Taylor', email: 'ivytaylor@example.com', access: 'Viewer' },
  { id: 11, name: 'Jack Robinson', email: 'jackrobinson@example.com', access: 'Commentor' },
  { id: 12, name: 'Karen Moore', email: 'karenmoore@example.com', access: 'Editor' },
  { id: 13, name: 'Liam Harris', email: 'liamharris@example.com', access: 'Viewer' },
];

const ShareDialog = ({ open, onClose }) => {
  const [users, setUsers] = useState(mockUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const handleToggleUser = (userId) => {
    if (users.find(user => user.id === userId)?.isOwner) return;
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleRemoveSelectedUsers = () => {
    setUsers(prev => prev.filter(user => !selectedUsers.includes(user.id) || user.isOwner));
    setSelectedUsers([]);
    setShowCheckboxes(false); // Auto-hide checkboxes after removal
  };

  const handleAddUser = () => {
    if (newUserEmail) {
      const newUser = {
        id: users.length,
        name: newUserEmail.split('@')[0],
        email: newUserEmail,
        access: 'Viewer'
      };
      setUsers(prev => [...prev, newUser]);
      setNewUserEmail('');
    }
  };

  const handleChangeAccess = (userId, newAccess) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, access: newAccess } : user
    ));
  };

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  return (
    <>
      <GlobalStyle />
      <StyledDialog open={open} onClose={() => {}} maxWidth="sm" fullWidth>
        <StyledDialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Share "Sample Document"</Typography>
            <Box>
              <IconButton size="small">
                <HelpOutlineIcon />
              </IconButton>
              <IconButton size="small">
                <SettingsIcon />
              </IconButton>
            </Box>
          </Box>
        </StyledDialogTitle>
        <StyledDialogContent style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
          <Box style={{ paddingLeft: '24px', paddingRight: '24px' }} mb={2} display="flex" alignItems="center" mt={2}>
            <StyledTextField
              fullWidth
              label="Add people or groups"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              variant="outlined"
            />
            <Button onClick={handleAddUser} style={{ marginLeft: '10px', height: '56px' }}>Add</Button>
          </Box>
          <Box style={{ paddingLeft: '24px', paddingRight: '24px' }}display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle1">People with access:</Typography>
            <Box>
              <Button onClick={toggleCheckboxes} variant="outlined" size="small">
                {showCheckboxes ? 'Hide Select' : 'Select'}
              </Button>
              <IconButton size="small">
                <EmailIcon />
              </IconButton>
            </Box>
          </Box>
          <ScrollableList>
            {users.map(user => (
              <StyledListItem key={user.id} button onClick={() => handleToggleUser(user.id)} disabled={user.isOwner}>
                {showCheckboxes && <Checkbox checked={selectedUsers.includes(user.id)} disabled={user.isOwner} />}
                <Avatar sx={{ marginRight: 2 }}>{user.name[0]}</Avatar>
                <ListItemText 
                  primary={user.name} 
                  secondary={user.email}
                  primaryTypographyProps={{ style: { fontWeight: user.isOwner ? 'bold' : 'normal' } }}
                />
                {user.isOwner ? (
                  <Typography variant="body2" color="textSecondary" style={{ marginLeft: 'auto' }}>
                    Owner
                  </Typography>
                ) : (
                  <StyledSelect
                    value={user.access}
                    onChange={(e) => handleChangeAccess(user.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    disabled={user.isOwner}
                  >
                    <MenuItem value="Viewer">Viewer</MenuItem>
                    <MenuItem value="Commentor">Commentor</MenuItem>
                    <MenuItem value="Editor">Editor</MenuItem>
                  </StyledSelect>
                )}
              </StyledListItem>
            ))}
          </ScrollableList>
          {showCheckboxes && (
            <Box mt={2}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleRemoveSelectedUsers}
                disabled={selectedUsers.length === 0}
              >
                Remove Selected Users
              </Button>
            </Box>
          )}
        </StyledDialogContent>
        <StyledDialogActions>
          <Button variant="outlined" color="primary">
            Copy Link
          </Button>
          <Button variant="contained" color="primary" onClick={onClose}>
            Done
          </Button>
        </StyledDialogActions>
      </StyledDialog>
    </>
  );
};

export default ShareDialog;