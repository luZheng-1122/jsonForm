import { Fragment, useState, useMemo } from 'react';
import { JsonForms } from '@jsonforms/react';
import { createAjv, ValidationMode } from '@jsonforms/core';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from './logo.svg';
import './App.css';
import schema from './schema.json';
import uischema from './uischema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester';
import { makeStyles } from '@mui/styles';
import MyGroupRenderer, { myGroupTester } from './MyGroup';
import CheckBoxWithPriceControl, {
  checkBoxWithPriceControlTester,
} from './CheckBoxPriceControl';
import InputWithErrorControl, {
  InputWithErrorControlTester,
} from './InputWithErrorControl';

const useStyles = makeStyles({
  container: {
    padding: '1em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '0.25em',
    backgroundColor: '#cecece',
    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    display: 'block !important',
  },
  demoform: {
    margin: 'auto',
    padding: '1rem',
  },
});

const initialData = {
  name: '',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3,
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
  { tester: myGroupTester, renderer: MyGroupRenderer },
  {
    tester: checkBoxWithPriceControlTester,
    renderer: CheckBoxWithPriceControl,
  },
  {
    tester: InputWithErrorControlTester,
    renderer: InputWithErrorControl,
  },
];

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState<any>(initialData);
  const stringifiedData = useMemo(() => JSON.stringify(data, null, 2), [data]);
  const [validationMode, setValidationMode] =
    useState<ValidationMode>('NoValidation');
  const ajv = createAjv({ allErrors: true });
  require('ajv-errors')(ajv);
  const clearData = () => {
    setData({});
  };

  return (
    <Fragment>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to JSON Forms with React</h1>
          <p className='App-intro'>More Forms. Less Code.</p>
        </header>
      </div>

      <Grid
        container
        justifyContent={'center'}
        spacing={1}
        className={classes.container}
      >
        <Grid item sm={6}>
          <Typography variant={'h4'} className={classes.title}>
            Bound data
          </Typography>
          <div className={classes.dataContent}>
            <pre id='boundData'>{stringifiedData}</pre>
          </div>
          <Button
            className={classes.resetButton}
            onClick={clearData}
            color='primary'
            variant='contained'
          >
            Clear data
          </Button>
        </Grid>
        <Grid item sm={6}>
          <Typography variant={'h4'} className={classes.title}>
            Rendered form
          </Typography>
          <div className={classes.demoform}>
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => {
                setData(data);
                console.log('on change', errors, data);
                // TODO: compare data and initial data
                if (data.name !== '') {
                  setValidationMode('ValidateAndShow');
                }
              }}
              ajv={ajv}
              validationMode={validationMode}
            />
          </div>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
