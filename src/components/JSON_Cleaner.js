export function extractUsefulData(data) {
  if (
    data.Rows &&
    data.Rows.Row &&
    data.Rows.Row[0] &&
    data.Rows.Row[0].ColData
  ) {
    let header = [];
    let summary = [];
    let res = {};

    if (data.Header) {
      if (data.Header.ColData) {
        let col_data = data.Header.ColData.filter(
          (col) => col.value.length !== 0
        );
        header.push(col_data);
      } else {
        header.push({
          Currency: data.Header.Currency,
          StartPeriod: data.Header.StartPeriod,
          EndPeriod: data.Header.EndPeriod,
          ReportName: data.Header.ReportName,
        });
      }
    }

    if (data.Summary && data.Summary.ColData) {
      let col_data = data.Summary.ColData.filter(
        (col) => col.value.length !== 0
      );
      summary.push(col_data);
    }

    let row = data.Rows.Row.map((elem) => {
      let col_data = [];
      if (elem.ColData)
        col_data = elem.ColData.filter((col) => col.value.length !== 0);
      let type = elem.type ? elem.type : null;
      let group = elem.group ? elem.group : null;
      let dt = {};

      if (type) dt.type = type;
      if (group) dt.group = group;
      dt.ColData = col_data;

      return dt;
    });

    if (data.Columns) res.Columns = data.Columns;
    if (data.type) res.type = data.type;
    if (data.group) res.group = data.group;

    res.Header = header;
    res.Summary = summary;
    res.row = row;

    return res;
  }

  //second portion

  let header = [];
  let summary = [];
  let res = {};

  if (data.Header) {
    if (data.Header.ColData) {
      let col_data = data.Header.ColData.filter(
        (col) => col.value.length !== 0
      );
      header.push(col_data);
    } else {
      header.push({
        Currency: data.Header.Currency,
        StartPeriod: data.Header.StartPeriod,
        EndPeriod: data.Header.EndPeriod,
        ReportName: data.Header.ReportName,
      });
    }
  }

  if (data.Summary && data.Summary.ColData) {
    let col_data = data.Summary.ColData.filter((col) => col.value.length !== 0);
    summary.push(col_data);
  }

  if (data.Columns) res.Columns = data.Columns;
  if (data.type) res.type = data.type;
  if (data.group) res.group = data.group;

  res.Header = header;
  res.Summary = summary;
  res.rows = [];

  if (data.Rows && data.Rows.Row) {
    for (let r = 0; r < data.Rows.Row.length; r++) {
      res.rows.push(extractUsefulData(data.Rows.Row[r]));
    }
  }

  return res;
}
