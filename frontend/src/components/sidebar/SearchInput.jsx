import { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import toast from "react-hot-toast";

const SearchInput = ({ conversations, setFilteredConversations }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search.length === 0) {
      setFilteredConversations(conversations);
    } else {
      const searchTerm = search.toLowerCase();
      const matchingConversations = conversations.filter((c) =>
        c.fullName.toLowerCase().includes(searchTerm)
      );
      setFilteredConversations(matchingConversations);
    }
  }, [search, conversations, setFilteredConversations]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    if (filteredConversations.length > 0) {
      toast.success("Conversations filtered successfully!");
      setSearch("");
    } else {
      toast.error("No such user found!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
