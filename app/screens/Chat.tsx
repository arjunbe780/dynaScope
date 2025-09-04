import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { wp } from '../config/dimension';
import colors from '../config/colors';
import fonts from '../config/fonts';
import { Divider } from 'react-native-paper';

// Mock API for leads
const fetchLeads = async (query: string) => {
  return [
    { id: '1', name: 'Lead A', location: 'Chennai', score: 85 },
    { id: '2', name: 'Lead B', location: 'Bangalore', score: 75 },
    { id: '3', name: 'Lead C', location: 'Hyderabad', score: 92 },
  ];
};

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');

  const handleSend = async () => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now().toString(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);

    const leads = await fetchLeads(text);

    const aiMsg = { id: Date.now().toString(), type: 'ai', leads };
    setMessages(prev => [...prev, aiMsg]);

    setText('');
  };

  const renderItem = ({ item }: any) => {
    if (item.type === 'user') {
      return (
        <View style={[styles.bubble, styles.userBubble]}>
          <Text style={styles.userText}>{item.text}</Text>
        </View>
      );
    }

    return (
      <View style={[styles.bubble, styles.aiBubble]}>
        <Text style={styles.aiTitle}>Here are the leads:</Text>
        {item.leads.map((lead: any) => (
          <View
            key={lead.id}
            style={[styles.leadCard, lead.score > 80 && styles.highlightCard]}
          >
            <Text style={styles.leadName}>{lead.name}</Text>
            <Text style={styles.leadInfo}>📍 {lead.location}</Text>
            <Text style={styles.leadInfo}>⭐ {lead.score}%</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>My Chat</Text>
      </View>
      <Divider />

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatBody}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type here..."
          value={text}
          onChangeText={setText}
          placeholderTextColor={colors.secondaryText}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={styles.sendLabel}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primaryBackground },
  chatBody: { padding: wp(10) },
  header: {
    paddingHorizontal: wp(20),
    paddingVertical: wp(15),
    elevation: 2,
  },
  bubble: {
    marginVertical: wp(5),
    padding: wp(10),
    borderRadius: wp(10),
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: colors.primaryButton,
    alignSelf: 'flex-end',
  },
  aiBubble: {
    backgroundColor: '#f3f3f3',
    alignSelf: 'flex-start',
  },
  userText: { color: '#fff', fontFamily: fonts.GloryBold },
  aiTitle: { marginBottom: wp(6), fontFamily: fonts.GloryRegular },
  leadCard: {
    backgroundColor: '#fff',
    borderRadius: wp(8),
    padding: wp(10),
    marginVertical: wp(5),
    elevation: 2,
  },
  highlightCard: {
    borderWidth: 2,
    borderColor: colors.primaryText,
  },
  leadName: { fontFamily: fonts.GloryBold, fontSize: wp(16) },
  leadInfo: { fontFamily: fonts.GloryRegular, fontSize: wp(14), marginTop: 2 },
  inputRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: wp(10),
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp(8),
    paddingHorizontal: wp(10),
    fontFamily: fonts.GloryRegular,
  },
  sendBtn: {
    marginLeft: wp(10),
    backgroundColor: colors.primaryButton,
    borderRadius: wp(8),
    paddingHorizontal: wp(16),
    justifyContent: 'center',
  },
  sendLabel: {
    color: '#fff',
    fontFamily: fonts.GloryBold,
  },
  headerText: {
    fontWeight: 'bold',
    fontFamily: fonts.GloryBold,
    fontSize: wp(22),
  },
});

export default Chat;
