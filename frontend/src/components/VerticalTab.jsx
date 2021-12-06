import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import PanelHome from './PanelHome';
import PanelMajor from './PanelMajor';
import PanelMinor from './PanelMinor';
import PanelGraduation from './PanelGraduation';
import PanelAdvisor from './PanelAdvisor';

import { deepMemo } from '@hooks';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
        style: {
            textAlign: 'left',
        },
    };
}

const VerticalTabs = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                height: '100%',
            }}
        >
            <Tabs
                orientation='vertical'
                variant='scrollable'
                value={value}
                onChange={handleChange}
                aria-label='Vertical tabs example'
                sx={{ borderRight: 1, borderColor: 'divider', minWidth: 350 }}
            >
                <Tab label='Home' {...a11yProps(0)} />
                <Tab label='Check Major Requirements' {...a11yProps(1)} />
                <Tab label='Check Minor Requirements' {...a11yProps(2)} />
                <Tab label='Check Graduation Requirements' {...a11yProps(3)} />
                <Tab label='View Advisor Details' {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <PanelHome />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PanelMajor />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PanelMinor />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <PanelGraduation />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <PanelAdvisor />
            </TabPanel>
        </Box>
    );
};

export default deepMemo(VerticalTabs);
