//package com.IT4409.backend.services;
//
//import com.IT4409.backend.dtos.MessageDTO.MessageRequestDTO;
//import com.IT4409.backend.dtos.MessageGroupDTO.MessageGroupRequestDTO;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.web.bind.annotation.PathVariable;
//
//import java.util.List;
//import java.util.Map;
//
//@SuppressWarnings("unused")
//public class MessageService {
//    @Autowired
//    private SimpMessagingTemplate simpMessagingTemplate;
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//    private String groupId;
//
//    public void sendMessage(String to, MessageRequestDTO messageRequestDTO){
//        jdbcTemplate.update(
//                "insert into messages (message_text, message_from, message_to, created_datetime" +
//                "values (?, ?, ?, current_time )",
//                messageRequestDTO.getMessage(), messageRequestDTO.getFromLogin(), to);
//        simpMessagingTemplate.convertAndSend("/topic/messages" + to, messageRequestDTO);
//    }
//    public List<Map<String, Object>> getListMessage(@PathVariable("from") long from,
//                                                    @PathVariable("to") long to)
//    {
//        return jdbcTemplate.queryForList(
//                "select * from messages where (message_from=? and message_to=?) " +
//                "or (message_to=? and message_from=?) order by created_datetime asc",
//                from, to, from, to);
//    }
//    public List<Map<String, Object>> getListMessageGroups(@PathVariable("groupId") long groupId){
//        return jdbcTemplate.queryForList(
//                "select gm.*, us.name as name from group_message gm " +
//                "join users us on us.id=gm.user_id " +
//                "where gm.group_id=? order by created_datetime asc",
//                groupId);
//    }
//    public void sendMessageGroup(long to, MessageGroupRequestDTO messageGroupDTO){
//        jdbcTemplate.update(
//                "INSERT INTO group_messages (group_id, user_id, messages, created_datetime) " +
//                        "VALUES(?, ?, ?, current_timestamp)",
//                to, messageGroupDTO.getFromLogin(), messageGroupDTO.getMessage());
//        messageGroupDTO.setGroupId(to);
//        simpMessagingTemplate.convertAndSend("/topic/messages/group" + to, messageGroupDTO);
//    }
//
//}
