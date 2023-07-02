from django.shortcuts import render, get_object_or_404
from django.http import HttpResponseNotAllowed
from rest_framework.viewsets import ModelViewSet
from .serializers import BookSerializer
from .models import Book

# Create your views here.


class BookViewSet(ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


def delete_book(request, book_id):
    book_record = get_object_or_404(Book, id=book_id)

    if request.method == 'DELETE':
        book_record.delete()
        return render(request, 'frontend/index.html', {"book_id": book_id})
    else:
        return HttpResponseNotAllowed(['DELETE'])


def create_book(request):
    print(request.body)
    if request.method == 'POST':
        Book.objects.create(title=request.data['title'])
        return render(request, 'frontend/index.html')
    else:
        return HttpResponseNotAllowed(['POST'])
