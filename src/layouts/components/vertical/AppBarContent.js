// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

import Web3 from 'web3'
import { useState } from 'react'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

const ETH_NET = "0x01";

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const [connectBtnName, setConnectBtnName] = useState("Connect Wallet");
  const [connectState, setConnectState] = useState(false);

  const shortAddress = (address) => {
    const len = address.length;
    return address.slice(0, 6) + "..." + address.slice(len-4, len);
  }

  const onConnectWallet = async () => {
    if(connectState) {
      setConnectBtnName("Connect Wallet");
      setConnectState(false);
      return;
    }

    if(window.ethereum === undefined || !window.ethereum.isMetaMask) {
      return false;
    }

    let web3Provider;
    if (window.ethereum) {
        web3Provider = window.ethereum;
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (error) {
            console.log("User denied account access");
            return false;
        }
    } else if (window.web3) {
        web3Provider = window.web3.currentProvider;
    } else {
        web3Provider = new Web3.providers.HttpProvider(ETH_NET);
    }
    const web3 = new Web3(web3Provider);

    let act = await web3.eth.getAccounts(function (error, accounts) {
        if (error) {
            return null;
        }
        return accounts[0];
    });

    if (act != null) {
      const shortAddr = shortAddress(act[0]);
      setConnectBtnName(shortAddr);
      setConnectState(true);
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown />
        <Button fullWidth variant='contained' onClick={onConnectWallet}>
          {connectBtnName}
        </Button>
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
