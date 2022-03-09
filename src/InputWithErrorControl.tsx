import {
  ControlProps,
  isStringControl,
  RankedTester,
  rankWith,
} from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Unwrapped } from '@jsonforms/material-renderers';
import { Grid } from '@mui/material';
const { MaterialTextControl } = Unwrapped;

export const InputWithErrorControl = (props: ControlProps) => {
  const label = `${props.label} my input`;

  return (
    <Grid container>
      <Grid item xs={12}>
        {/* can change MaterialTextControl to your own input text */}
        <MaterialTextControl {...props} label={label} />
      </Grid>
    </Grid>
  );
};

export const InputWithErrorControlTester: RankedTester = rankWith(
  3,
  isStringControl
);
export default withJsonFormsControlProps(InputWithErrorControl);
