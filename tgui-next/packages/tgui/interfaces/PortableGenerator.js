
import { Fragment } from 'inferno';
import { act } from '../byond';
import { Box, Button, Section, NoticeBox, LabeledList, ProgressBar } from '../components';

export const PortableGenerator = props => {
  const { state } = props;
  const { config, data } = state;
  const { ref } = config;
  let stackPercentState;
  if (data.stack_percent > 50) {
    stackPercentState = "good";
  }
  else if (data.stack_percent > 15) {
    stackPercentState = "average";
  }
  else {
    stackPercentState = "bad";
  }
  let sheetsAmount;
  if (data.sheets > 5) {
    sheetsAmount = "good";
  }
  else if (data.sheets > 0) {
    sheetsAmount = "average";
  }
  else {
    sheetsAmount = "bad";
  }

  return (
    <Fragment>
      {!data.anchored && (
        <NoticeBox>Generator not anchored.</NoticeBox>
      )}
      <Section title="Status">
        <LabeledList>
          <LabeledList.Item label="Power switch">
            <Button
              icon={data.active ? "power-off" : "times"}
              onClick={() => act(ref, 'toggle_power')}
              disabled={!data.ready_to_boot}>
              {data.active ? "On" : "Off"}
            </Button>
          </LabeledList.Item>
          <LabeledList.Item label={data.sheet_name + " sheets"}>
            <Box inline color={stackPercentState}>{data.sheets}</Box>
            {(data.sheets >= 1) && (
              <Button
                icon="eject"
                disabled={data.active}
                onClick={() => act(ref, 'eject')}>
                Eject
              </Button>
            )}
          </LabeledList.Item>
          <LabeledList.Item label="Current sheet level">
            <ProgressBar
              value={data.stack_percent}
              color={sheetsAmount} />
          </LabeledList.Item>
          <LabeledList.Item label="Heat level">
            {data.current_heat < 100 ? (
              <Box inline color="good">Nominal</Box>
            ) : (
              data.current_heat < 200 ? (
                <Box inline color="average">Caution</Box>
              ) : (
                <Box inline color="bad">DANGER</Box>
              )
            )}
          </LabeledList.Item>
        </LabeledList>
      </Section>
      <Section title="Output">
        <LabeledList>
          <LabeledList.Item label="Current output">
            {data.power_output}
          </LabeledList.Item>
          <LabeledList.Item label="Adjust output">
            <Button
              icon="minus"
              onClick={() => act(ref, 'lower_power')}>
              {data.power_generated}
            </Button>
            <Button
              icon="plus"
              onClick={() => act(ref, 'higher_power')}>
              {data.power_generated}
            </Button>
          </LabeledList.Item>
          <LabeledList.Item label="Power available">
            <Box inline color={data.connected ? "" : "Bad"}>
              {data.connected ? data.power_available : "Unconnected"}
            </Box>
          </LabeledList.Item>
        </LabeledList>
      </Section>
    </Fragment>); };
