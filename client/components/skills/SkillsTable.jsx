import DragAndDropTable from "../common/DragAndDropTable.jsx"


class SkillsTable extends DragAndDropTable{
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
    }
}

export default SkillsTable
