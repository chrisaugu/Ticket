import React from "react";

function CheckBox({ name, value, tick, onCheck }) {
  let [city, setCity] = useState({
    isAllSelected: false,
    checkList: [
      {
        name: "city",
        value: "bangalore",
        checked: false,
      },
      {
        name: "city",
        value: "chennai",
        checked: false,
      },
      {
        name: "city",
        value: "delhi",
        checked: false,
      },
    ],
  });

  return (
    <label>
      <input
        name={name}
        type="checkbox"
        value={value}
        checked={tick || false}
        onChange={onCheck}
      />
      {value}
    </label>
  );
}

function CheckBoxList({ options, isCheckedAll, onCheck }) {
  const checkBoxOptions = (
    <div className="checkbox-list">
      {options.map((option, index) => {
        return (
          <CheckBox
            key={index}
            name={option.name}
            value={option.value}
            tick={option.checked}
            onCheck={(e) => onCheck(option.value, e.target.checked)}
          />
        );
      })}
    </div>
  );

  return (
    <div className="checkbox-list">
      <CheckBox
        name="select-all"
        value="ALL"
        tick={isCheckedAll}
        onCheck={(e) => onCheck("all", e.target.checked)}
      />
      {checkBoxOptions}
    </div>
  );
}

let onCheckBoxChange = (checkName, isChecked) => {
  let isAllChecked = checkName === "all" && isChecked;
  let isAllUnChecked = checkName === "all" && !isChecked;
  const checked = isChecked;

  const checkList = city.checkList.map((city, index) => {
    if (isAllChecked || city.value === checkName) {
      return Object.assign({}, city, {
        checked,
      });
    } else if (isAllUnChecked) {
      return Object.assign({}, city, {
        checked: false,
      });
    }

    return city;
  });

  let isAllSelected =
    checkList.findIndex((item) => item.checked === false) === -1 ||
    isAllChecked;

  setCity({
    checkList,
    isAllSelected,
  });
};
