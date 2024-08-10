import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";
import SearchInput from "./SearchInput";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const [filteredConversations, setFilteredConversations] =
    useState(conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      <SearchInput
        conversations={conversations}
        setFilteredConversations={setFilteredConversations}
      />

      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        filteredConversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === filteredConversations.length - 1}
          />
        ))
      )}
    </div>
  );
};

export default Conversations;
