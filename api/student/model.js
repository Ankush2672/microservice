module.exports = (sequelize, DataTypes) => {
  console.log("in");
  const students = sequelize.define(
    'students',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      roll_no: {
        type: DataTypes.STRING,
        allowNull: false
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created_date : {
        type: DataTypes.DATE
      }
    }
  );
  students.associate = (models) => {
    students.belongsTo(models.customers, {foreignKey: 'created_by'});
  };
  return students;
};

