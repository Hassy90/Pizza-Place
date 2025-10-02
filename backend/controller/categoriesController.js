import Categories from "../model/Categories.js";

const categoryPortion = async(req, res) => {
    try {
        const {category,description} =  req.body;
        await Categories.insertOne({category,description})
        return res.status(200).json({message: "data submitted successfully"})
    } catch (error) {
        console.log("category-portion error", error.message)
    };
};

const getCategory = async (req, res) => {
    try {
        const categoryData = await Categories.find();
        if (!categoryData){
            return res.status(404).json({message: "category not found"})
        }
        return res.status(200).json({message: "data is getting", 
            data: categoryData})
    } catch (error) {
        console.log("getCategory error...", error.message)
    }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, description } = req.body;
    const updated = await Categories.findByIdAndUpdate(id, { category, description }, { new: true });
    return res.status(200).json({ message: "Category updated", updated });
  } catch (error) {
    console.log("updateCategory error...", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Categories.findByIdAndDelete(id);
    return res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.log("deleteCategory error...", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { categoryPortion, getCategory, updateCategory, deleteCategory };


