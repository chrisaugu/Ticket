import React from 'react';

import { parse_csv_to_json } from "../scripts/utils";

import Icon from "./Icon";
import Ticket from "../libs/Ticket";

class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filename: ""
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (e) => {
    let files = e.target.files;
    let $this = this;

    if (files && files.length > 0) {
      let file = files.item(0);
      this.setState({filename: file.name});

      file.text().then(function(response){
        console.log(response);
        let data =parse_csv_to_json(response);

        let list = [];
        for (let i = 0; i < data.length; i++) {
          list.push(new Ticket(i, data[i].ticket_no, data[i].ticket_status));
        }
        
        console.log(list);
        $this.props.onFileUpload(data);
      })
      .catch(function(error) {
        console.error(error);
      });
    }
  }

  render() {
    let filename = this.state.filename;

    return (
      <>
        <div className="file is-centered is-boxed is-success has-name">
          <label className="file-label">
            <input className="file-input" type="file" name="ticketscsv" accept="text/csv" onChange={this.handleChange}/>
            <span className="file-cta">
              <span className="file-icon">
                <Icon icon="plus" color="white"/>
              </span>
              <span className="file-label">
                Import CSV file...
              </span>
            </span>
            <span className="file-name">{filename}</span>
          </label>
        </div>
      </>
    );
  }
}

export default FileUpload;