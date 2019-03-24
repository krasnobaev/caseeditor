const fs = require('fs');

const NEWCASE_DELIM = 'NEWCASE';
const QA_DELIM = '-----';

function serialize (aData) {
  function trim (str) {
    return (str || '').trim();
  };

  return aData.map(el => {
    return ([NEWCASE_DELIM].concat((el.description ? [
      trim(el.description),
      trim(el.in),
      trim(el.out),
    ] : [
      trim(el.in),
      trim(el.out),
    ]).join(`\n${QA_DELIM}\n`))).join('\n');
  }).join('\n');
};

function deserialize (oData) {
  let cases = oData.split(NEWCASE_DELIM);
  cases.shift();

  return cases.map(_case => {
    let acase = _case.split(QA_DELIM).map(el => el.trim());
    let description;
    let _in = '';
    let out = '';

    if (acase.length === 3) {
      description = acase[0];
      _in         = acase[1];
      out         = acase[2];
    } else if (acase.length === 2) {
      _in         = acase[0];
      out         = acase[1];
    }

    return {
      description,
      'in': _in,
      out,
    };

  });
};

export const load_file = (sFile) => {
  try {
    let data = deserialize(fs.readFileSync(sFile, 'utf8'));
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const save_file = (sFile, aData) => {
  fs.writeFile(sFile, serialize(aData), err => {
    if (err) {
      return console.log(err);
    }

    console.log('The file was saved!');
  });

  return 'OK';
};
