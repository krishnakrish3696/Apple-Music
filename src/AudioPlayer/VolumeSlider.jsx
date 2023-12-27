// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Slider from '@mui/material/Slider';
// import MuiInput from '@mui/material/Input';
// import VolumeUp from '@mui/icons-material/VolumeUp';
// import Slider from 'react-slick';

// const Input = styled(MuiInput)`
//   width: 42px;
// `;

// const Slider = styled(Slider)(({theme, ...props}) => ({
//     color: 'silver'
// })
// )
// export default function InputSlider() {
//   const [value, setValue] = React.useState(30);

//   const handleSliderChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleInputChange = (event) => {
//     setValue(event.target.value === '' ? 0 : Number(event.target.value));
//   };

//   const handleBlur = () => {
//     if (value < 0) {
//       setValue(0);
//     } else if (value > 100) {
//       setValue(100);
//     }
//   };

//   return (
//     <Box sx={{ width: 100, paddingLeft: 10, paddingTop:1 }}>
//       <Grid container spacing={2} alignItems="center">
//         <Grid item>
//           <VolumeUp />
//         </Grid>
//         <Grid item xs>
//           <Slider
//             value={typeof value === 'number' ? value : 0}
//             onChange={handleSliderChange}
//             aria-labelledby="input-slider"
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
