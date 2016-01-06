// проверяем что userId на самом деле автор данного документа
ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
}