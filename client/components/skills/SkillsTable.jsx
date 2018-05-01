import BaseTable from "../common/BaseTable.jsx"


class SkillsTable extends BaseTable{
    componentWillMount() {
        this.setState(
            {rows: [
                {id: 1, name: "Javascript", value: 9},
                {id: 2, name: "Python", value: 7},
                {id: 3, name: "Django", value: 7},
                {id: 4, name: "React", value: 7},
                {id: 5, name: "Redux", value: 5},
                {id: 6, name: "Php", value: 3},
            ]}
        )
        console.log(this.state) // why it is empty? while all works?
    }
}

export default SkillsTable
